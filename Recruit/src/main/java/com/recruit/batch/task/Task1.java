package com.recruit.batch.task;

import org.springframework.stereotype.Component;

@Component
public class Task1 implements Task {
    public boolean run() {
        try {
            System.out.println("🟢 Task 1 실행됨");
            // 실제 처리 로직
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    @Override
    public boolean execute() {
        System.out.println("🔧 Task1 수행");
        return true;
    }    
}

