const digidipApiClientCode = `@Component
class DigidipApiClient {

    companion object {
        val LOG: Logger = LoggerFactory.getLogger(DigidipApiClient::class.java)
        private val restTemplate = RestTemplate(
            HttpComponentsClientHttpRequestFactory(
                HttpClients.custom().setDefaultCookieStore(BasicCookieStore()).build()
            )
        )
    }
    
    fun fetchTransactions(
        digidip: Network, url: String = "", startModifiedTimestampSeconds: Long, endModifiedTimestampSeconds: Long
    ): String {

        val urlToLoad = if (url == "") trimMultiLine(
            \"""
            \${digidip.tansactionApiBaseUrl}
            /detailed-transactions?
                project_id=\${digidip.subAccountId}
                &timestamp_start_modified_date=\$startModifiedTimestampSeconds
                &timestamp_end_modified_date=\$endModifiedTimestampSeconds
                &page=0
            \"""
        ) else url

        LOG.info("fetching data with url '\$urlToLoad'")

        val response = restTemplate.exchange(
            urlToLoad, HttpMethod.GET, HttpEntity<String>(getHeaders(digidip)), String::class.java
        )

        if (response.statusCode.is2xxSuccessful) {
            return response.body ?: throw IllegalStateException("Response body is null for URL: \$url")
        } else {
            val errorMessage =
                "Digidip transaction request failed. Status: \${response.statusCode}, Body: \${response.body}"
            LOG.error(errorMessage)
            throw IllegalStateException(errorMessage)
        }
    }

    private fun getHeaders(digidip: Network): HttpHeaders = HttpHeaders().apply {
        accept = listOf(MediaType.APPLICATION_JSON)

        val base64Encoded =
            Base64.getEncoder().encodeToString("\${digidip.credentialsUser}:\${digidip.credentialsSecret}".toByteArray())

        set("Authorization", "BASIC \$base64Encoded")
    }

}
`;

export default digidipApiClientCode;
