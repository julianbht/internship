/**
 * Scrapes and assembles Charity objects from the DZI website.
 */
@Component
class DziScraper(
    private val htmlParser: DziHtmlParser,
    private val certificateRestRepository: CertificateRestRepository,
    private val fieldOfWorkRepository: FieldOfWorkRepository,
) {
    companion object {
        private val LOG: Logger = LoggerFactory.getLogger(DziScraper::class.java)
        const val DZI_CERT_TITLE = "Siegel des Deutschen Zentralinstituts für soziale Fragen (DZI)"
    }

    /**
     * Downloads the charity details page at [orgUrl] and returns the fully assembled Charity.
     */
    fun getCharity(orgUrl: String): Charity? {
        LOG.info("\n--- Scraping charity page: $orgUrl ---")
        val doc: Document = Jsoup.connect(orgUrl).get()
        return buildCharity(doc, orgUrl)
    }

    /**
     * Builds a Charity from the parsed document and enriches it with related entities.
     */
    fun buildCharity(doc: Document, orgUrl: String): Charity? {
        // Create an empty charity and set its basic attributes.
        val charity = Charity(
            organisation = Organisation()
        )
        setBasicDetails(charity, doc)

        // Gather objects that charity is connected to.
        val fieldsOfWork = buildFieldsOfWork(doc)
        val grant = buildGrant(doc, charity, orgUrl)

        // Set them as attributes.
        charity.fieldsOfWork = fieldsOfWork.toMutableSet()
        if (grant != null) {
            charity.certificateGrants.add(grant)
        }

        return charity
    }

    /**
     * Extracts and sets all primary information from the document into the Charity object.
     */
    private fun setBasicDetails(charity: Charity, doc: Document): Charity {
        return charity.apply {
            // Properties shared across all dzi charities
            organisation.currencyCode = "EUR"
            organisation.state = ""
            organisation.countryCode = "DE"
            organisation.taxLiable = true
            taxDeductible = null

            // Main page information
            organisation.name = htmlParser.getName(doc)
            organisation.displayName = organisation.name  // Using name as display name for now
            organisation.description = htmlParser.getDescription(doc)
            organisation.logoUrl = htmlParser.getLogoUrl(doc)
            focusedCountryCodes = htmlParser.getCountryCodes(doc)
                .map { countryName -> countryCodesMap.getValue(countryName) }


            // General information (e.g. foundation date, city, legal form, worldview)
            val infoBox = htmlParser.getGeneralInformationBox(doc)
            if (infoBox != null) {
                founded = htmlParser.getFounded(infoBox)
                organisation.legalForm = htmlParser.getLegalForm(infoBox)
                worldview = htmlParser.getWorlview(infoBox)
            } else {
                LOG.debug("No odababox with 'Allgemeine Informationen' found")
            }

            // Contact information (e.g. website, email, phone, address)
            val kontaktBox = htmlParser.getKontaktBox(doc)
            if (kontaktBox != null) {
                organisation.website = htmlParser.getWebsite(kontaktBox)
                organisation.email = htmlParser.getEmail(kontaktBox)
                organisation.phoneNumber = htmlParser.getPhoneNumber(kontaktBox)
                organisation.addressLine1 = htmlParser.getAddressLine1(kontaktBox)
                // Override city if provided by the contact box
                organisation.city = htmlParser.getCity(kontaktBox)
                organisation.postalCode = htmlParser.getPostalCode(kontaktBox)
            } else {
                LOG.debug("No odababox with 'Kontakt' found")
            }

            // Organisation information (e.g. governing body, voting members, employees & volunteers)
            val orgBox = htmlParser.getOrganisationBox(doc)
            if (orgBox != null) {
                governingBody = htmlParser.getGoverningBody(orgBox)
                votingMembers = htmlParser.getVotingMembers(orgBox)
                val (employees, volunteers) = htmlParser.getEmployeesAndVolunteers(orgBox)
                this.employees = employees
                this.volunteers = volunteers
            } else {
                LOG.debug("No odababox with 'Organisation' header found.")
            }

            // Financial information (e.g. reporting year, total income, fundraising income)
            reportingYear = htmlParser.getReportingYear(doc)
            totalIncome = htmlParser.getTotalIncome(doc)
            fundraisingIncome = htmlParser.getFundraisingIncome(doc)

            // Generate an ID from external dzi id (found in article tag on website)
            id = combineToUUID(htmlParser.getArticleId(doc))
        }
    }

    /**
     * Resolves the list of Fields of Work by title.
     * Only existing fields in the database are included.
     */
    private fun buildFieldsOfWork(doc: Document): List<FieldOfWork> {
        val fieldTitles = htmlParser.getFieldsOfWork(doc) // Now returns List<String>
        return fieldTitles.mapNotNull { title ->
            fieldOfWorkRepository.findByTitle(title)
        }
    }

    /**
     * Creates a CertificateGrant if the document contains valid grant data.
     * Links it to the given charity and the expected certificate.
     */
    private fun buildGrant(doc: Document, charity: Charity, url: String): CertificateGrant? {
        // Get the granted date; if it's not available, return null since no grant exists
        val grantDate = htmlParser.getGrantedAt(doc) ?: return null

        // Seach for dzi cert by title
        val certificate = certificateRestRepository.findByTitle(DZI_CERT_TITLE)
            ?: throw IllegalStateException("Certificate with name $DZI_CERT_TITLE not found.")

        // grant id = charity id + certificate id
        val id = combineToUUID(charity.id.toString(),certificate.id.toString(), "")

        // Build and return grant
        return CertificateGrant(
            certificate = certificate,
            charity = charity,
            id = id
        ).apply {
            overheadCosts = htmlParser.getOverheadCosts(doc)
            description = htmlParser.getGrantDescription(doc)
            grantedAt = grantDate
            certificateUrl = url
        }
    }

}
