package com.korit.ch02.filter;

import jakarta.servlet.*;

import java.io.IOException;

public class TestFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("전처리");
        filterChain.doFilter(servletRequest, servletResponse);
        System.out.println("후처리");
    }
}
