### Tạo class LoggingInterceptor

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

public class LoggingInterceptor implements ClientHttpRequestInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body,
                                        ClientHttpRequestExecution execution) throws IOException {

        logRequestDetails(request, body);
        ClientHttpResponse response = execution.execute(request, body);
        logResponseDetails(response);
        return response;
    }

    private void logRequestDetails(HttpRequest request, byte[] body) {
        logger.info("=== Request ===");
        logger.info("URI     : {}", request.getURI());
        logger.info("Method  : {}", request.getMethod());
        logger.info("Headers : {}", request.getHeaders());
        logger.info("Body    : {}", new String(body, StandardCharsets.UTF_8));
    }

    private void logResponseDetails(ClientHttpResponse response) throws IOException {
        logger.info("=== Response ===");
        logger.info("Status  : {}", response.getStatusCode());
        logger.info("Headers : {}", response.getHeaders());
        String body = new BufferedReader(
                new InputStreamReader(response.getBody(), StandardCharsets.UTF_8))
                .lines().collect(Collectors.joining("\n"));
        logger.info("Body    : {}", body);
    }
}
```

### Custom class RestClientConfig

```java
@Configuration
public class RestClientConfig {
  @Bean
  public RestClient restClient() {
    var factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());

    RestTemplate template = new RestTemplate(factory);
    template.setInterceptors(List.of(new LoggingInterceptor()));

    return RestClient.builder()
        .requestFactory(template.getRequestFactory()) // dùng factory có interceptor
        .build();
  }
}
```
