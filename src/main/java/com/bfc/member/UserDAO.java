package com.bfc.member;
import java.util.*;
import java.sql.*;

public class UserDAO {
	 private Connection getConnection() {
		 String dbUrl = "jdbc:mysql://localhost:3306/bfc?characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false";
		 String id = "root";
		 String pw = "비밀번호 변경해주세요";
	     Connection conn = null;
	     try {
	    	 Class.forName("com.mysql.cj.jdbc.Driver");
	    	 conn = DriverManager.getConnection(dbUrl, id, pw);
	     } catch (Exception e) {
	         e.printStackTrace();
	     }
	     return conn;
	 }
	 
	 public UserDTO getUserInfo(int UserId) {
		 UserDTO userDTO = new UserDTO();
		 userDTO.setUserId(UserId);
	     String sql = "SELECT * FROM User WHERE UserId = " + UserId;
	     try (Connection conn = getConnection();
	          PreparedStatement ps = conn.prepareStatement(sql);
	          ResultSet rs = ps.executeQuery()) {
	         while (rs.next()) {
	        	 userDTO.setNickname(rs.getString("nickname"));
	        	 userDTO.setLogin(rs.getString("login"));
	        	 userDTO.setPassword(rs.getString("password"));
	         }
	     } catch (SQLException e) {
	         e.printStackTrace();
	     }
	     return userDTO;
	 }
	 
	 public boolean updateUserInfo(UserDTO userDTO) {
			boolean success = false;
			String sql = "UPDATE user SET nickname = ?, password = ? WHERE userId = ?";
			try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
				ps.setString(1, userDTO.getNickname());
				ps.setString(2, userDTO.getPassword());
				ps.setInt(3, userDTO.getUserId());
				ps.executeUpdate();
				success = true;
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return success;
		} 
}