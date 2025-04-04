@Component
class DziHtmlParser() {
    companion object {
        private val LOG: Logger = LoggerFactory.getLogger(DziHtmlParser::class.java)
    }

    // --- Methods that parse attributes from html ---

    // Parses and returns the founding date as a LocalDate.
    // Returns null if not found or if parsing fails.
    fun getFounded(infoBox: Element): LocalDate? {
        val paragraph =
            infoBox.select(".orgaboxtext p").firstOrNull { it.select("strong").text().trim() == "Gründungsjahr" }
        return paragraph?.let {
            val value = extractValueFromParagraph(it)
            try {
                LocalDate.of(value.toInt(), 1, 1)
            } catch (e: Exception) {
                LOG.debug("Error while converting String into LocalDate: $value")
                null
            }
        }
    }

    // Parses and returns the website URL.
    // Returns null if the URL is empty or the paragraph is not found.
    fun getWebsite(kontaktBox: Element): String? {
        val websiteParagraph = kontaktBox.select("p:has(strong:contains(Website))").firstOrNull()
        return websiteParagraph?.let {
            it.select("strong").remove()
            it.select("a").attr("href").ifEmpty { null }
        }
    }

    // Parses and returns the email address (without the "mailto:" prefix).
    // Returns null if not found.
    fun getEmail(kontaktBox: Element): String? {
        val emailParagraph = kontaktBox.select("p:has(strong:contains(E-Mail))").firstOrNull()
        return emailParagraph?.let {
            it.select("strong").remove()
            it.select("a").attr("href").removePrefix("mailto:").ifEmpty { null }
        }
    }

    // Parses and returns the phone number.
    // Returns null if not found.
    fun getPhoneNumber(kontaktBox: Element): String? {
        val phoneParagraph = kontaktBox.select("p:has(strong:contains(Telefon))").firstOrNull()
        return phoneParagraph?.let {
            extractValueFromParagraph(it).ifEmpty { null }
        }
    }

    // Returns the number of voting members ("Mitglieder/Gesellschafter") or null if not found.
    fun getVotingMembers(orgBox: Element): Int? {
        val paragraph = orgBox.select(".orgaboxtext p")
            .firstOrNull { it.select("strong").text().trim() == "Mitglieder/Gesellschafter" }
        return paragraph?.let {
            val value = extractValueFromParagraph(it)
            Regex("""(\d+)""").find(value)?.value?.toIntOrNull()
        }
    }

    fun getEmployeesAndVolunteers(orgBox: Element): Pair<Int?, Int?> {
        val paragraph = orgBox.select(".orgaboxtext p")
            .firstOrNull { it.select("strong").text().trim().startsWith("Anzahl Mitarbeiter") } ?: return Pair(
            null,
            null
        )

        val value = extractValueFromParagraph(paragraph)

        val employees = Regex("hauptamtlich\\s*:\\s*(\\d+)", RegexOption.IGNORE_CASE).find(value)?.groupValues?.get(1)
            ?.toIntOrNull()
        val volunteers = Regex("ehrenamtlich\\s*:\\s*(\\d+)", RegexOption.IGNORE_CASE).find(value)?.groupValues?.get(1)
            ?.toIntOrNull()

        return Pair(employees, volunteers)
    }

    // Returns the name (which can be used for both name and displayName) or null if not found.
    fun getName(doc: Document): String? {
        return doc.select("h1.tg-page-header__title").firstOrNull()?.text()?.trim()
    }

    // Returns a list of country codes based on the "Länderschwerpunkte" section.
    // If none are found, returns an empty list.
    fun getCountryCodes(doc: Document): List<String> {
        val countryHeader = doc.select("h3:contains(Länderschwerpunkte)").firstOrNull()
        val pElement = countryHeader?.nextElementSibling()?.takeIf { it.tagName() == "p" }
        return pElement?.text()?.split(",")?.map { it.trim() }?.filter { it.isNotEmpty() } ?: emptyList()
    }

    // Returns the description (from "Tätigkeitsfelder") or null if not found.
    fun getDescription(doc: Document): String? {
        val descriptionHeader = doc.select("h3:contains(Tätigkeitsfelder)").firstOrNull()
        val pElement = descriptionHeader?.nextElementSibling()?.takeIf { it.tagName() == "p" }
        return pElement?.text()?.trim()
    }

    // Returns the reporting year (as a Year) or null if not found or if parsing fails.
    fun getReportingYear(doc: Document): Year? {
        val yearStr = getFinanceValue(doc, "Bezugsjahr")
        return yearStr?.toIntOrNull()?.let { Year.of(it) }
    }

    // Returns the fundraising income as a CurrencyValue or null if not found.
    fun getFundraisingIncome(doc: Document): BigDecimal? {
        val fundraisingStr = getFinanceValue(doc, "Sammlungseinnahmen")
        return fundraisingStr?.let { parseCurrencyValue(it) }
    }

    // Returns the logo URL or null if not found.
    fun getLogoUrl(doc: Document): String? {
        return doc.select(".odabalogo img").firstOrNull()?.attr("src")
    }

    // Returns the street address (address line 1) from the Kontakt box, or null if not found.
    fun getAddressLine1(kontaktBox: Element): String? {
        val addressLines = getAddressLines(kontaktBox)
        return if (addressLines.size > 1) addressLines[1] else null
    }

    // Returns the postal code extracted from the address or null if not found.
    fun getPostalCode(kontaktBox: Element): String? {
        val addressLines = getAddressLines(kontaktBox)
        if (addressLines.size > 2) {
            val tokens = addressLines[2].split(" ")
            if (tokens.isNotEmpty()) {
                return tokens[0]
            }
        }
        return null
    }

    // Returns the city extracted from the address or null if not found.
    fun getCity(kontaktBox: Element): String? {
        val addressLines = getAddressLines(kontaktBox)
        if (addressLines.size > 2) {
            val tokens = addressLines[2].split(" ")
            if (tokens.size > 1) {
                return tokens.subList(1, tokens.size).joinToString(" ")
            }
        }
        return null
    }

    fun getArticleId(doc: Document): String {
        return doc.select("article[id^=post-]").attr("id").removePrefix("post-")
    }

    fun getGrantDescription(doc: Document): String? {
        val header = doc.select("h3:contains(Einschätzung)").first()
        val description = header?.nextElementSibling()?.takeIf { it.tagName() == "p" }
        return description.toString()
    }

    fun getGrantedAt(doc: Document): LocalDate? {
        val p = doc.select("p:contains(Träger des DZI Spenden-Siegels seit)").first()
        val token = p?.text()?.split("seit ")?.getOrNull(1)?.split(" ") // Split by space to isolate the first date

        val date: LocalDate? = token?.getOrNull(0)?.let {
            LocalDate.parse(it.trim(), DateTimeFormatter.ofPattern("dd.MM.yyyy"))
        }

        return date
    }

    fun getLegalForm(infoBox: Element): LegalForm? {
        val paragraph =
            infoBox.select(".orgaboxtext p").firstOrNull { it.select("strong").text().trim() == "Rechtsform" }
        return paragraph?.let {
            val extractedText = extractValueFromParagraph(it).trim()
            legalFormMap.getValue(extractedText)
        }
    }

    fun getTotalIncome(doc: Document): BigDecimal? {
        // Looks for the header containing "Gesamteinnahmen:"
        val incomeStr = getFinanceValue(doc, "Gesamteinnahmen:")
        return incomeStr?.let { parseCurrencyValue(it) }
    }

    fun getGoverningBody(orgBox: Element): GoverningBody? {
        val paragraph =
            orgBox.select(".orgaboxtext p").firstOrNull { it.select("strong").text().trim() == "Leitungsorgan" }
        return paragraph?.let {
            governingBodyMap.getValue(extractValueFromParagraph(it))
        }
    }

    fun getWorlview(infoBox: Element): Worldview? {
        val paragraph = infoBox.select(".orgaboxtext p")
            .firstOrNull { it.select("strong").text().trim() == "Weltanschauliche Ausrichtung" }
        return paragraph?.let {
            val extractedText = extractValueFromParagraph(it).trim()
            worldviewMap.getValue(extractedText)
        }
    }

    fun getFieldsOfWork(doc: Document): List<String> {
        return doc.select("h3:contains(Arbeitsschwerpunkte)").first()
            ?.nextElementSibling()
            ?.takeIf { it.tagName() == "p" }
            ?.text()
            ?.split(",")
            ?.map { it.trim() }
            ?.filter { it.isNotEmpty() }
            ?: emptyList() // Return an empty list if nothing is found
    }

    fun getOverheadCosts(doc: Document): OverheadCostType? {
        val tableHeader = doc.select("th:contains(Anteil)").first()
        val description = tableHeader?.nextElementSibling()?.takeIf { it.tagName() == "td" }
        return description?.text()?.lowercase()?.trim()?.let {
            overheadCostTypeMap.getValue(it)
        }
    }

    // --- Pagination methods ---

    fun fetchEntryUrls(pageUrl: String): List<String> {
        val doc = Jsoup.connect(pageUrl).get()
        return doc.select("div.e27posttypes-block-item a[href]")
            .map { it.attr("href") }
            .filter { it.isNotEmpty() }
            .distinct()
    }

    fun getNextPageUrl(currentPage: String, totalProcessed: Int, maxEntries: Int): String? {
        if (totalProcessed >= maxEntries) return null
        val doc = Jsoup.connect(currentPage).get()
        return doc.select("link[rel=next]").attr("href").takeIf { it.isNotEmpty() }
    }

    // --- Methods that get the html boxes ---

    fun getGeneralInformationBox(doc: Document): Element? {
        return doc.select(".odababox").firstOrNull {
            it.select(".orgaboxheader h3").text().contains("Allgemeine Informationen", ignoreCase = true)
        }
    }

    fun getKontaktBox(doc: Document): Element? {
        return doc.select(".odababox")
            .firstOrNull { it.select(".orgaboxheader h3").text().contains("Kontakt", ignoreCase = true) }
    }

    fun getOrganisationBox(doc: Document): Element? {
        return doc.select(".odababox")
            .firstOrNull { it.select(".orgaboxheader h3").text().contains("Organisation", ignoreCase = true) }
    }

    // --- Helper Functions ---

    // Helper to remove the <strong> element and convert <br> tags to newlines.
    private fun extractValueFromParagraph(p: Element): String {
        p.select("strong").remove()
        return Jsoup.parse(p.html().replace("<br>", "\n")).text().trim()
    }

    // Extracts the text content from the table cell (td) that immediately follows a table header (th)
    // containing the provided [headerContains] text.
    private fun getFinanceValue(doc: Document, headerContains: String): String? {
        val tableHeader: Element? = doc.select("th:contains($headerContains)").first()
        val tdElement: Element? = tableHeader?.nextElementSibling()?.takeIf { it.tagName() == "td" }
        return tdElement?.text()?.trim()
    }

    // This function removes any thousands separators (.) and ignores the decimals (after ",").
    private fun parseCurrencyValue(value: String): BigDecimal? {
        val numberPart = value.split(" ").firstOrNull()?.split(",")?.firstOrNull()?.replace(".", "")
        return numberPart?.toBigDecimalOrNull()
    }

    // Helper function that extracts the address lines from the Kontakt box.
    private fun getAddressLines(kontaktBox: Element): List<String> {
        val addressParagraph = kontaktBox.select("p:has(strong:contains(Anschrift))").first()
        return addressParagraph?.let {
            it.html().split(Regex("<br\\s*/?>")) // splits on <br>, <br/>, or <br />
                .map { line -> Jsoup.parse(line).text().trim() }.filter { line -> line.isNotEmpty() }
        } ?: emptyList()
    }
}