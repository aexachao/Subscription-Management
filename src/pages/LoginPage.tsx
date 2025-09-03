import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import { Button } from '@/components/ui/button';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
  const res = await fetch('/api/login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        onLogin();
        navigate('/');
      } else {
        setError(data.message || '登录失败');
      }
    } catch (err) {
      setError('网络错误');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Form.Root className="bg-card p-8 rounded-xl shadow-lg w-full max-w-md border border-border" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">登录</h2>
        <Form.Field name="username" className="mb-6">
          <Form.Label className="block mb-2 text-sm font-medium text-foreground">账号</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password" className="mb-6">
          <Form.Label className="block mb-2 text-sm font-medium text-foreground">密码</Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Control>
        </Form.Field>
        {error && <div className="text-destructive text-sm mb-4 text-center">{error}</div>}
        <Form.Submit asChild>
          <Button className="w-full" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default LoginPage;
