package com.example.backend.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.ProfileImageUrl;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.backend.entity.User;
import com.example.backend.services.JwtService;
import com.example.backend.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    JwtService jwtService;
    // private BcryptPasswordEncoder
    
    @PostMapping("/signup")
    public ResponseEntity<?> postMethodName(@RequestBody User user) {
        try{
            System.out.println("eseche");
            String token = userService.signup(user);  
            return new ResponseEntity<>(token,HttpStatus.CREATED);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        
    }
    @PostMapping("/signin")
    public ResponseEntity<?> postMethodName(@RequestBody LoginRequest credentials) {
        try{
            System.out.println("ha eseche ");
            String token = userService.handleLogin(credentials);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        
    }
    @GetMapping("/authCheck")
    public ResponseEntity<?> postMethodName() {
        try{
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/getProfiledetails")
    public ResponseEntity<?> getProfileDetails(HttpServletRequest request) {
       try{
        String authHeader = request.getHeader("Authorization");
        String token ="";
        String username = "";
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            System.out.println(token);
            username = jwtService.extractUsername(token);
            System.out.println(username);
        }

        ArrayList<String> profile = userService.getProfileDetails(username);
        if(profile.size()>=1) {
            return new ResponseEntity<>(profile, HttpStatus.OK);
        }else{
            throw new RuntimeException("Nothing is in the user details");
        }
       }
       catch(Exception e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
       }

    }
    @PostMapping("/setProfileimage")
    public ResponseEntity<?> postMethodName(HttpServletRequest request, @RequestBody ProfileImageUrl profileImageUrl) {
        try{
            String authHeader = request.getHeader("Authorization");
            String token ="";
            String username = "";
            if(authHeader != null && authHeader.startsWith("Bearer ")){
                token = authHeader.substring(7);        
                username = jwtService.extractUsername(token);
            }
          
           String url = profileImageUrl.getImageUrl();
            String ans = userService.setProfileimageUrl(username, url);
            return new ResponseEntity<>(ans, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
}
