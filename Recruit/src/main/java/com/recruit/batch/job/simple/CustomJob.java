package com.recruit.batch.job.simple;

import org.springframework.stereotype.Component;

import com.recruit.batch.task.Task1;
import com.recruit.batch.task.Task2;
import com.recruit.batch.task.Task3;

@Component
public class CustomJob {

    private final Task1 task1;
    private final Task2 task2;
    private final Task3 task3;

    public CustomJob(Task1 task1, Task2 task2, Task3 task3) {
        this.task1 = task1;
        this.task2 = task2;
        this.task3 = task3;
    }

    public void run() {
        if (!task1.run()) return;
        if (!task2.run()) return;
        if (!task3.run()) return;
    }
}
