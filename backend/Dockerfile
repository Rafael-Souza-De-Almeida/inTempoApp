FROM maven:3.9.9-amazoncorretto-21 as builder
WORKDIR /app
COPY . .
RUN mvn dependency:resolve
RUN mvn clean package -DskipTests

FROM amazoncorretto:21
WORKDIR /build
COPY --from=builder ./app/target/*.jar ./application.jar
EXPOSE 8080

ENV POSTGRES_HOST=localhost

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=production", "application.jar"]
