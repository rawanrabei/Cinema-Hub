package com.booking.demo.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("execution(* com.booking.demo.controller..*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        
        logger.info("Entering {}.{}()", className, methodName);
        
        long startTime = System.currentTimeMillis();
        
        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            logger.info("Exiting {}.{}() - Execution time: {}ms", className, methodName, duration);
            
            return result;
        } catch (Exception e) {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            logger.error("Exception in {}.{}() - Execution time: {}ms - Error: {}", 
                className, methodName, duration, e.getMessage());
            
            throw e;
        }
    }

    @Around("execution(* com.booking.demo.service..*(..))")
    public Object logServiceAround(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        
        logger.info("Service call: {}.{}()", className, methodName);
        
        long startTime = System.currentTimeMillis();
        
        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            logger.info("Service completed: {}.{}() - Duration: {}ms", className, methodName, duration);
            
            return result;
        } catch (Exception e) {
            logger.error("Service error: {}.{}() - Error: {}", className, methodName, e.getMessage());
            throw e;
        }
    }
}
