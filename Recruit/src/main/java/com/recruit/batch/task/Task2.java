package com.recruit.batch.task;

import org.springframework.stereotype.Component;

@Component
public class Task2 implements Task  {
    public boolean run() {
        try {
            System.out.println("🔵 Task 2 실행됨");
            // 실제 처리 로직
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    @Override
    public boolean execute() {
        System.out.println("🔧 Task2 수행");
        return true;
    }    
}