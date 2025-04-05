@Embeddable
class Organisation(
    // --- BASIC DETAILS ---
    @Column(name = "name")
    @NotNull
    var name: String? = null,

    @Column(name = "display_name")
    @NotNull
    var displayName: String? = null,

    @Column(name = "logo_url")
    var logoUrl: String? = null,

    @Column(name = "description")
    var description: String? = null,

// --- ADDRESS DETAILS ---
    @Column(name = "address_line1")
    var addressLine1: String? = null,

    @Column(name = "address_line2")
    var addressLine2: String? = null,

    @Column(name = "city")
    var city: String? = null,

    @Column(name = "state")
    var state: String? = null,

    @Column(name = "country_code")
    var countryCode: String? = null,

    @Column(name = "postal_code")
    var postalCode: String? = null,

// --- CONTACT DETAILS ---
    @Column(name = "phone_number")
    var phoneNumber: String? = null,

    @Column(name = "email")
    @Email
    var email: String? = null,

    @Column(name = "website")
    var website: String? = null,

// --- SOCIAL MEDIA JSON FIELD ---
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "social_media", columnDefinition = "json")
    var socialMedia: List<SocialMedia>? = null,

// --- BOOKING DETAILS ---
    @Column(name = "currency_code")
    var currencyCode: String? = null,

    @Column(name = "tax_liable")
    var taxLiable: Boolean? = true,

    @ManyToOne
    @JoinColumn(name = "tax_area_id")
    var taxArea: TaxArea? = null,

    @Column(name = "tax_registration_number")
    var taxRegistrationNumber: String? = null,

    @Column(name = "legal_form")
    @Enumerated(EnumType.STRING)
    var legalForm: LegalForm? = null,
)