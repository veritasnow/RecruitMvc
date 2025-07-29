package com.recruit.batch.status;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;


@Component
public class BatchStateManager {

    private final Map<String, BatchState> stateMap = new ConcurrentHashMap<>();

    public BatchStateManager() {
        stateMap.put("simple", new BatchState());
        stateMap.put("parallel", new BatchState());
    }

    public BatchState get(String id) {
        return stateMap.get(id);
    }

    public Map<String, BatchState> getAll() {
        return stateMap;
    }
    
    public void setEnabled(String id, boolean enabled) {
        BatchState state = stateMap.get(id);
        if (state != null) {
            state.setEnabled(enabled);
        }
    }    
}