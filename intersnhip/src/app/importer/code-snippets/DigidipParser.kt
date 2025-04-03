@Component
class DigidipParser {

    // Retrieves the URL for the next page of results from the API response.
    fun getNextUrl(response: String): String {
        // Get the link to the next page
        val root: JsonObject = JsonParser.parseString(response).asJsonObject
        val nextLinkNode = root.getAsJsonArray("_links").find { it.asJsonObject["rel"].asString == "next" }


        val url = nextLinkNode?.asJsonObject?.get("href")?.asString ?: ""
        return url.replace("http", "https")
    }

    // Parses merchant data from the JSON response.
    fun parseMerchantsFromJson(digidip: Network, jsonResponse: String): List<Merchant> {
        val root: JsonObject = JsonParser.parseString(jsonResponse).asJsonObject

        return root.getAsJsonArray("data").map { merchantElement ->
            val merchantObject = merchantElement.asJsonObject

            val externalId = merchantObject["merchant_id"].asString
            val uuid = generateMerchantUUID(digidip, externalId)


            val newMerchant = Merchant(
                id = uuid,
                externalId = merchantObject["merchant_id"].asString,
                name = merchantObject["merchant_name"].asString,
                websiteUrl = merchantObject["homepage"].asString,
                contract = Contract(
                    status = if (merchantObject["active_program"].asString == "yes") ContractStatus.ACTIVATED else ContractStatus.SUSPENDED
                ),
                network = digidip
            )
            newMerchant
        }
    }

    // Parses transaction data from the JSON response.
    fun parseTransactionsFromJson(
        digidip: Network,
        jsonResponse: String,
        merchantRestRepository: MerchantRestRepository
    ): List<Transaction> {
        val root: JsonObject = JsonParser.parseString(jsonResponse).asJsonObject

        val transactions = mutableListOf<Transaction>()
        val transArray = root.getAsJsonArray("data")

        for (jsonElement in transArray) {
            val transactionObj = jsonElement.asJsonObject

            val externalId = transactionObj.get("id").asString
            val id = generateMerchantUUID(digidip, externalId)

            val status = transactionObj.get("status").asString
            val dateObj = transactionObj.getAsJsonObject("date")
            val dateTimestamp = dateObj.get("timestamp").asLong
            val date = Instant.ofEpochSecond(dateTimestamp).atOffset(ZoneOffset.UTC)

            val lastModifiedDateObj = transactionObj.getAsJsonObject("last_modified_date")
            val lastModifiedTimestamp = lastModifiedDateObj.get("timestamp").asLong
            val lastModifiedDate = Instant.ofEpochSecond(lastModifiedTimestamp).atOffset(ZoneOffset.UTC)

            val priceObj = transactionObj.getAsJsonObject("price")
            val priceAmount = priceObj.get("amount").asBigDecimal
            val priceCurrency = priceObj.get("currency").asString

            val commissionObj = transactionObj.getAsJsonObject("commission")
            val commissionAmount = commissionObj.get("amount").asBigDecimal
            val commissionCurrency = commissionObj.get("currency").asString

            val merchantObj = transactionObj.getAsJsonObject("merchant")
            val externalMerchantId = merchantObj.get("id").asString

            val merchantId = generateTransactionUUID(digidip, externalMerchantId)

            val clickObj = transactionObj.getAsJsonObject("click")
            val subIdContent = clickObj.getAsJsonObject("custom_subid").get("content").asString
            // Handle can be "undefined"
            val subId: String? = if (subIdContent == "undefined") null else subIdContent

            val merchant: Merchant = merchantRestRepository.findById(merchantId).orElseThrow {
                IllegalStateException("Merchant with ID $merchantId (externalMerchantId: $externalMerchantId) not found.")
            }

            val transaction = Transaction(
                id = id,
                externalId = externalId,
                status = status,
                createdAt = date,
                updatedAt = lastModifiedDate,
                priceAmount = priceAmount,
                priceCurrency = priceCurrency,
                commissionAmount = commissionAmount,
                commissionCurrency = commissionCurrency,
                merchant = merchant,
                subId = subId
            )

            transactions.add(transaction)
        }

        return transactions
    }

}