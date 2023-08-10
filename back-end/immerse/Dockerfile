FROM openjdk:11-jdk-slim
# EXPOSE 8080

ARG JASYPT_SECRET
ENV JASYPT_ENV=$JASYPT_SECRET

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]
ENTRYPOINT java -jar -DjasyptSecret=$JASYPT_ENV /app.jar
# ARG DEBIAN_FRONTEND=noninteractive
# ENV TZ=Asia/Seoul