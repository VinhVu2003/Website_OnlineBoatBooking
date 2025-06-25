import React, { useState } from 'react';
import { Button, Form, Input, Image, Checkbox, Modal } from 'antd';
import { login } from '../../api/login/login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // {{ edit_2 }}

  const handleLogin = async() => {
    console.log(username, password);
    try{
      const response = await login(username, password);
      sessionStorage.setItem('user', JSON.stringify(response.data));
    Modal.success({
      title: 'Thành công',
      content: 'Đăng nhập thành công',
    });
    navigate('/admin'); // {{ edit_3 }}
  }catch(error){
    Modal.error({
      title: 'Thất bại',
      content: 'Đăng nhập thất bại',
    });
  }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-blue-500">
        <div className="" style={{marginTop: '100px'}}>

          <div className="mb-4" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image src="../../assets/img/black_logo.webp" alt="Login Image" width={500} />
          </div>

          <div className="" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px'}}>
            <Form>
              <Form.Item label="Tài khoản" className="mb-4">
                <Input placeholder="you@example.com" onChange={(e) => setUsername(e.target.value)} />
              </Form.Item>
              <Form.Item label="Mật khẩu" className="mb-4">
                <Input.Password placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Form.Item className="">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button type="primary" htmlType="submit" size="large" onClick={handleLogin}>Đăng nhập</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
