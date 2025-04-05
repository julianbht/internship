@Entity
@Table(name = "network", schema = "data")
class Network(
    // --- IDENTIFIER ---
    @Id
    @Column(name = "network_id", nullable = false)
    @NotNull
    var id: UUID? = null,

    @Embedded
    var organisation: Organisation,

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    var type: NetworkType? = null,

    @Column(name = "software_vendor")
    @Enumerated(EnumType.STRING)
    var softwareVendor: SoftwareVendor? = null,

    @Column(name = "credentials_user")
    var credentialsUser: String? = null,

    @Column(name = "credentials_secret")
    var credentialsSecret: String? = null,

    @Column(name = "account_id")
    var accountId: String? = null,

    @Column(name = "sub_account_id")
    var subAccountId: String? = null,

    @Column(name = "merchant_api_base_url")
    var merchantApiBaseUrl: String? = null,

    @Column(name = "merchant_import_interval_seconds")
    var merchantImportIntervalSeconds: Int? = null,

    @Column(name = "transaction_api_base_url")
    var tansactionApiBaseUrl: String? = null,

    @Column(name = "transaction_import_interval_seconds")
    var transactionImportIntervalSeconds: Int? = null,

    @Column(name = "transaction_import_interval_length_seconds")
    var transactionImportIntervalLengthSeconds: Int? = null,

    @Column(name = "transaction_import_start_at")
    var transactionImportStartAt: OffsetDateTime? = null,

    @OneToMany(mappedBy = "network", cascade = [CascadeType.ALL], fetch = FetchType.LAZY, orphanRemoval = false)
    var merchants: MutableSet<Merchant>? = mutableSetOf(),

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

        other as Network
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "Network(id=$id, organisation=$organisation, type=$type, softwareVendor=$softwareVendor, credentialsUser=$credentialsUser, credentialsSecret=$credentialsSecret, accountId=$accountId, subAccountId=$subAccountId, merchantApiBaseUrl=$merchantApiBaseUrl, merchantImportIntervalSeconds=$merchantImportIntervalSeconds, tansactionApiBaseUrl=$tansactionApiBaseUrl, transactionImportIntervalSeconds=$transactionImportIntervalSeconds, transactionImportIntervalLengthSeconds=$transactionImportIntervalLengthSeconds, transactionImportStartAt=$transactionImportStartAt, merchants=$merchants, createdAt=$createdAt, updatedAt=$updatedAt)"
    }


}
