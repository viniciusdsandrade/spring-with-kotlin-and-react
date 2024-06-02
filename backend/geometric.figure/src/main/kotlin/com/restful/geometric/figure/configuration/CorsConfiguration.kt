package com.restful.geometric.figure.configuration

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@Tag(name = "CORS Configuration", description = "Configuration class for Cross-Origin Resource Sharing (CORS).")
class CorsConfiguration {

    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins("*") // Permitir todas as origens
                    .allowedMethods("*") // Permitir todos os métodos HTTP
                    .allowedHeaders("*") // Permitir todos os cabeçalhos
                    .allowCredentials(false) // Habilite credenciais se necessário
                    .maxAge(3600) // Tempo de cache para as respostas pré-flight (em segundos)
            }
        }
    }
}
