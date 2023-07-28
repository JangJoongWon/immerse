package com.sandcastle.immerse.model.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ShowProgressConverter implements AttributeConverter<ShowProgress, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ShowProgress progress) {
		if (progress == null)
			return null;
		return progress.getOrder();
	}

	@Override
	public ShowProgress convertToEntityAttribute(Integer order) {
		if (order == null)
			return null;

		return Stream.of(ShowProgress.values())
			.filter(e -> Integer.valueOf(e.getOrder()).equals(order))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
