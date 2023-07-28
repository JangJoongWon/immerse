package com.sandcastle.immerse.model.enums;

public enum ShowProgress {
	SCHEDULED(0),
	IN_PROGRESS(1),
	OVER(2);

	private int order;

	private ShowProgress(int order) {
		this.order = order;
	}

	public int getOrder() {
		return order;
	}
}
