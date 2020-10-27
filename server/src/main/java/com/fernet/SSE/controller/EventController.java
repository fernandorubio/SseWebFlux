package com.fernet.SSE.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalTime;

@RestController
@RequestMapping("event")
@CrossOrigin("http://localhost:4200")
public class EventController {

	@GetMapping(path = "/receive", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<String> sendEvent() {
		return Flux.interval(Duration.ofSeconds(5))
				.map(sequence -> LocalTime.now().toString());
	}

}
