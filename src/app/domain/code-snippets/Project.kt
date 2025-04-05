@Entity
@Table(name = "project", schema = "data")
class Project(

    // --- RELATIONSHIPS ---
    @ManyToOne
    @JoinColumn(name = "charity_id", nullable = false)
    @NotNull
    @JsonBackReference
    var charity: Charity,

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY, orphanRemoval = false)
    @JoinTable(
        name = "project_field_of_work",
        joinColumns = [JoinColumn(name = "project_id")],
        inverseJoinColumns = [JoinColumn(name = "field_of_work_id")]
    )
    var fieldsOfWork: MutableSet<FieldOfWork>,

    // --- GEOGRAPHIC REACH ---
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "focused_country_codes", columnDefinition = "json")
    var focusedCountryCodes: List<String>? = null,

    // --- EXTRA FIELDS FOR PROJECT ---
    @Id
    @Column(name = "project_id", nullable = false)
    @NotNull
    var id: UUID? = null,

    @Column(name = "name", nullable = false)
    @NotNull
    var name: String,

    @Column(name = "description")
    var description: String? = null,

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "social_media", columnDefinition = "json")
    var socialMedia: List<SocialMedia>? = null,

    @Column(name = "start_date")
    var startDate: LocalDate? = null,

    @Column(name = "end_date")
    var endDate: LocalDate? = null,


) {

    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: OffsetDateTime? = null

    @Column(name = "updated_at", nullable = false)
    var updatedAt: OffsetDateTime? = null

    @PrePersist
    fun prePersist() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now()
        }
        if (updatedAt == null) {
            updatedAt = createdAt
        }
        if(id == null) {
            id = UUID.randomUUID()
        }
    }

    @PreUpdate
    fun preUpddate() {
        if (updatedAt == null) {
            updatedAt = OffsetDateTime.now()
        }
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Project
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}
