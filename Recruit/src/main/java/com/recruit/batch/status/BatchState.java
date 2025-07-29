package com.recruit.batch.status;

import java.time.LocalDateTime;

public class BatchState {

    private boolean enabled = true;
    private LocalDateTime lastRun;
    private boolean lastSuccess;

    public BatchState() {}

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDateTime getLastRun() {
        return lastRun;
    }

    public void setLastRun(LocalDateTime lastRun) {
        this.lastRun = lastRun;
    }

    public boolean isLastSuccess() {
        return lastSuccess;
    }

    public void setLastSuccess(boolean lastSuccess) {
        this.lastSuccess = lastSuccess;
    }
}