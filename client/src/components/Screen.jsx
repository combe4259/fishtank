import React from "react";
import "./style.css";


export default function Screen() {
    return (
        <div className="screen">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="frame">
                        <div className="text-wrapper">🐠Fishtank 회원가입</div>

                        <div className="div">
                            <div className="div-wrapper">
                                <div className="text-wrapper-2">username</div>
                            </div>
                            <div className="text-wrapper-3">사용자명</div>
                        </div>

                        <div className="frame-2">
                            <div className="div-wrapper">
                                <div className="text-wrapper-2">password</div>
                            </div>
                            <div className="text-wrapper-3">비밀번호</div>
                        </div>

                        <div className="overlap-group-wrapper">
                            <div className="overlap-group">
                                <div className="text-wrapper-4">구글 계정으로 가입</div>
                            </div>
                        </div>

                        <div className="frame-3">
                            <div className="text-wrapper-5">회원가입</div>
                        </div>


                        <img className="image" alt="Fishtank Logo" src="/image-1.png" />
                    </div>
                </div>
            </div>
        </div>
    );
}