@Entity
@Table(name = "charity", schema = "data")
class Charity(

    @Id
    @Column(name = "charity_id", nullable = false)
    @NotNull
    var id: UUID? = null,

    @Embedded
    var organisation: Organisation,

    // --- RELATIONSHIPS ---
    @JsonManagedReference
    @OneToMany(mappedBy = "charity", cascade = [CascadeType.ALL], fetch = FetchType.LAZY, orphanRemoval = false)
    var projects: MutableSet<Project> = mutableSetOf(),

    @OneToMany
    @JoinTable(
        name = "charity_field_of_work",
        joinColumns = [JoinColumn(name = "charity_id")],
        inverseJoinColumns = [JoinColumn(name = "field_of_work_id")]
    )
    var fieldsOfWork: MutableSet<FieldOfWork> = mutableSetOf(), // Charity -> Fields of Work (One-directional)

    @OneToMany(mappedBy = "charity", cascade = [CascadeType.ALL], fetch = FetchType.LAZY, orphanRemoval = false)
    @JsonManagedReference
    var certificateGrants: MutableSet<CertificateGrant> = mutableSetOf(),

// --- GENERAL INFORMATION ---
    @Column(name = "founded")
    var founded: LocalDate? = null,

    @Enumerated(EnumType.STRING)
    @Column(name = "worldview")
    var worldview: Worldview? = null,

    @Enumerated(EnumType.STRING)
    @Column(name = "governing_body")
    var governingBody: GoverningBody? = null, // "Leitungsorgan"

// --- FINANCIAL INFORMATION ---
    @Column(name = "reporting_year")
    var reportingYear: Year? = null, // Bezugsjahr

    @Column(name = "total_income")
    var totalIncome: BigDecimal? = null, // Gesamteinnahmen

    @Column(name = "fundraising_income")
    var fundraisingIncome: BigDecimal? = null, // Sammlungseinnahmen

    @Column(name = "tax_deductible")
    var taxDeductible: Boolean? = null, // Is the Charity tax-deductible?

// --- HUMAN RESOURCES ---
    @Column(name = "voting_members")
    var votingMembers: Int? = null, // Stimmberechtigte Mitglieder

    @Column(name = "employees")
    var employees: Int? = null,  // "hauptamptlich"

    @Column(name = "volunteers")
    var volunteers: Int? = null,  // "ehrenamtlich"

// --- GEOGRAPHIC REACH ---
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "focused_country_codes", columnDefinition = "json")
    var focusedCountryCodes: List<String> = mutableListOf(),  // Countries where the charity operates

    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: OffsetDateTime? = null,

    @Column(name = "updated_at", nullable = false)
    var updatedAt: OffsetDateTime? = null,

    ) {

    @PrePersist
    fun prePersist() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now()
        }
        if (updatedAt == null) {
            updatedAt = createdAt
        }
        if (id == null) {
            id = UUID.randomUUID()
        }
    }

    @PreUpdate
    fun preUpdate() {
        if (updatedAt == null) {
            updatedAt = OffsetDateTime.now()
        }
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Charity
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Charity(id=$id, organisation=$organisation, projects=$projects, fieldsOfWork=$fieldsOfWork, certificateGrants=$certificateGrants, founded=$founded, worldview=$worldview, governingBody=$governingBody, reportingYear=$reportingYear, totalIncome=$totalIncome, fundraisingIncome=$fundraisingIncome, taxDeductible=$taxDeductible, votingMembers=$votingMembers, employees=$employees, volunteers=$volunteers, focusedCountryCodes=$focusedCountryCodes, createdAt=$createdAt, updatedAt=$updatedAt)"
    }


}
