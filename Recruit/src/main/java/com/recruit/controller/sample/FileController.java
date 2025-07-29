package com.recruit.controller.sample;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.recruit.router.Route;
import com.recruit.router.Router;
import com.recruit.router.ViewConstants;
import com.recruit.utils.file.FileExtensionValidator;

@Controller
@RequestMapping("/file")
public class FileController {

	@GetMapping("/sample")
	public String sample(Model model) {

		System.out.println("테스트..!!");
		
		Route  route  = Router.getInstance().getRoute("file");
		model.addAttribute("route", route);
		
		System.out.println("ViewConstants.INDEX : " + ViewConstants.IFRAME_INDEX);
		System.out.println("route : " + route.toString());
		
		return ViewConstants.IFRAME_INDEX;
	}	

	@PostMapping("/upload")
	@ResponseBody
	public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {
		Map<String, Object> response = new HashMap<>();
		
		// 파일명과 확장자 체크
		String filename = file.getOriginalFilename();
		if (filename == null || !FileExtensionValidator.isValidFile(filename)) {
			response.put("status", "error");
			response.put("message", "허용되지 않은 파일 확장자입니다.");
			return ResponseEntity.badRequest().body(response); 
		}
		
		try {
			// 저장 디렉토리 경로
			String uploadDir = "C:\\upload";
			
			// 저장 디렉토리가 존재하지 않으면 생성
			File directory = new File(uploadDir);
			if (!directory.exists()) {
				directory.mkdir();
			}
			
			// 저장 경로 설정
			File destFile = new File(uploadDir, filename);
			
			// 파일 저장
			file.transferTo(destFile);
			
			response.put("status" , "success");
			response.put("message", "파일 업로드 성공");
			response.put("content", String.format("파일 경로: %s, 크기: %d bytes", destFile.getAbsolutePath(), file.getSize()));
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			response.put("status", "error");
			response.put("message", "파일 저장 중 오류가 발생했습니다: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}		
}
