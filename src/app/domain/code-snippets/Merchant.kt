@Entity
@Table(name = "merchant", schema = "data")
class Merchant(

    @Id
    @Column(name = "merchant_id")
    var id: UUID? = null,

    @OneToMany(mappedBy = "merchant", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    var transactions: MutableList<Transaction> = mutableListOf(),

    @Column(name = "merchant_external_id", nullable = false)
    @NotNull
    var externalId: String,

    @Column(name = "name", nullable = false)
    @NotNull
    var name: String,

    @Column(name = "logo_url")
    var logoUrl: String? = null,

    @Column(name = "description")
    var description: String? = null,

    @Column(name = "website_url")
    var websiteUrl: String? = null,

    @Column(name = "click_url")
    var clickUrl: String? = null,

    @Column(name = "currency_code")
    var currencyCode: String? = null,

    @Column(name = "email")
    @Email
    var email: String? = null,

    // TODO categories!

    @Embedded
    var contract: Contract,

    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: OffsetDateTime? = null,

    @Column(name = "updated_at", nullable = false)
    var updatedAt: OffsetDateTime? = null,

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    var status: MerchantStatus? = null,

    @ManyToOne(optional = false)
    @JoinColumn(name = "network_id", nullable = false)
    @NotNull
    var network: Network,

    ) {

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

        other as Merchant
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}