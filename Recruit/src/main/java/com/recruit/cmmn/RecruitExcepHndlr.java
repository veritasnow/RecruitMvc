package com.recruit.cmmn;

import org.egovframe.rte.fdl.cmmn.exception.handler.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RecruitExcepHndlr implements ExceptionHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(RecruitExcepHndlr.class);

	@Override
	public void occur(Exception ex, String packageName) {
		LOGGER.debug(" RecruitExcepHndlr run...............");
	}
}
