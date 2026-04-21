package com.cinemahub.payment_service.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

@Aspect
@Configuration
public class AopLoggingConfig {

    private static final Logger logger = LoggerFactory.getLogger(AopLoggingConfig.class);

    @Before("execution(* com.cinemahub.payment_service.service.*.*(..))")
    public void logBeforeMethodExecution(JoinPoint joinPoint) {
        logger.info("Executing method: {}", joinPoint.getSignature().getName());
    }

    @AfterReturning(pointcut = "execution(* com.cinemahub.payment_service.service.*.*(..))", returning = "result")
    public void logAfterMethodExecution(JoinPoint joinPoint, Object result) {
        logger.info("Completed method: {}", joinPoint.getSignature().getName());
    }
}
