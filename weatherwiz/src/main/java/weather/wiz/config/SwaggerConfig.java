package weather.wiz.config;
/*package online.hotelmanagement.config;

import static springfox.documentation.builders.PathSelectors.regex; 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

*//**
 * Configuration class for Swagger UI for rest services documentation.
 *//*
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select().apis(RequestHandlerSelectors.basePackage("online.hotelmanagement.rest"))
                .paths(regex("/.*"))
                .build();
    }
}
*/