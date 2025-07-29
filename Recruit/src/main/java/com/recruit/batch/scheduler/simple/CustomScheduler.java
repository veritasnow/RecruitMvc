package com.recruit.batch.scheduler.simple;


import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.recruit.batch.job.simple.CustomJob;
import com.recruit.batch.status.BatchStateManager;

import java.time.LocalDateTime;

//@Component
//@EnableScheduling
public class CustomScheduler {

    private final CustomJob job;
    private final BatchStateManager batchStateManager;

    public CustomScheduler(CustomJob job, BatchStateManager batchStateManager) {
        this.job = job;
        this.batchStateManager = batchStateManager;
    }

    /**
     * [🔁 10초마다 실행]
     * - 상태가 ON인 경우에만 실행됨
     * - 실행 성공 여부와 시간도 상태에 기록
     */
    @Scheduled(fixedRate = 10000)
    public void runJob() {
        if (!batchStateManager.get("simple").isEnabled()) {
            System.out.println("⛔ [SCHEDULER] simple 비활성화 상태, 실행 안함");
            return;
        }

        System.out.println("🕒 [SCHEDULER] simple 배치 실행됨");
        try {
            job.run();
            batchStateManager.get("simple").setLastSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            batchStateManager.get("simple").setLastSuccess(false);
        }

        batchStateManager.get("simple").setLastRun(LocalDateTime.now());
    }
}
