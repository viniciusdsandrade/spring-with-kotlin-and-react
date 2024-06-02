package com.restful.geometric.figure.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import io.swagger.v3.oas.annotations.tags.Tag

@Configuration
@Tag(name = "CORS Configuration", description = "Configuration class for Cross-Origin Resource Sharing (CORS).")
class CorsConfiguration {

    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:8080", "http://localhost:5174/") // Substitua com as origens permitidas
                    .allowedMethods("GET", "POST", "PUT", "DELETE") // Especifique os métodos HTTP permitidos
                    .allowedHeaders("Authorization", "Content-Type") // Especifique os cabeçalhos permitidos
                    .allowCredentials(true) // Habilite credenciais se necessário
                    .maxAge(3600) // Tempo de cache para as respostas pré-flight (em segundos)
            }
        }
    }
}
