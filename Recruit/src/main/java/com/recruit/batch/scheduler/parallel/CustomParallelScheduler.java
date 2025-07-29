package com.recruit.batch.scheduler.parallel;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.recruit.batch.job.parallel.CustomParallelJob;
import com.recruit.batch.status.BatchStateManager;

import java.time.LocalDateTime;

//@Component
//@EnableScheduling
public class CustomParallelScheduler {

    private final CustomParallelJob customParallelJob;
    private final BatchStateManager batchStateManager;

    public CustomParallelScheduler(CustomParallelJob customParallelJob, BatchStateManager batchStateManager) {
        this.customParallelJob = customParallelJob;
        this.batchStateManager = batchStateManager;
    }

    /**
     * [🔁 10초마다 실행]
     * - 상태가 ON인 경우에만 실행됨
     * - 병렬로 Task들을 실행
     * - 전체 작업 성공 여부 및 마지막 실행 시각 기록
     */
    @Scheduled(fixedRate = 10000)
    public void runBatchJob() {
        if (!batchStateManager.get("parallel").isEnabled()) {
            System.out.println("⛔ [SCHEDULER] parallel 비활성화 상태, 실행 안함");
            return;
        }

        System.out.println("🕒 [SCHEDULER] 병렬 잡 실행 요청");

        try {
            customParallelJob.run();
            batchStateManager.get("parallel").setLastSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            batchStateManager.get("parallel").setLastSuccess(false);
        }

        batchStateManager.get("parallel").setLastRun(LocalDateTime.now());
    }
}