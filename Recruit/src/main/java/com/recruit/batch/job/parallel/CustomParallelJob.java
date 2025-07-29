package com.recruit.batch.job.parallel;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.springframework.stereotype.Component;

import com.recruit.batch.task.Task;

@Component // 스프링 빈으로 등록하여 의존성 주입 대상이 되도록 설정
public class CustomParallelJob {

    // 병렬로 실행할 Task들을 담는 리스트 (스프링이 자동 주입해줌 - Task 구현체들)
    private final List<Task> taskList;

    // 병렬 실행을 위한 고정 크기 스레드풀 (동시에 최대 3개 실행)
    private final ExecutorService executor = Executors.newFixedThreadPool(3);

    // 생성자: 스프링이 Task 구현체들을 주입해줌
    public CustomParallelJob(List<Task> taskList) {
        this.taskList = taskList;
    }

    // 실제 잡을 실행하는 메서드
    public void run() {
        System.out.println("🧩 [JOB] 실행 시작");

        // 실행 결과를 담을 Future 리스트
        List<Future<Boolean>> futures = new ArrayList<>();

        // 각 Task를 스레드 풀을 이용해 병렬로 실행
        for (Task task : taskList) {
            // task::execute → 람다식으로 Callable<Boolean> 생성됨
            futures.add(executor.submit(task::execute));
        }

        // 모든 Task의 실행 결과를 수집하고 예외 발생 시 처리
        for (Future<Boolean> future : futures) {
            try {
                // 각 Task의 결과 대기 → false면 실패로 판단하고 전체 중단
                if (!future.get()) {
                    System.out.println("❌ Task 실패. 중단.");
                    return;
                }
            } catch (Exception e) {
                // 예외 발생 시 스택 트레이스 출력
                e.printStackTrace();
            }
        }

        // 모든 Task가 정상 완료된 경우
        System.out.println("✅ [JOB] 모든 Task 완료");
    }
}