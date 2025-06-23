
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminNoIndex from '@/components/AdminNoIndex';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check credentials
    if (username === 'admin' && password === 'Husnain@786') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      });
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
      toast({
        title: "Login failed",
        description: "Please check your username and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <AdminNoIndex />
      <div className="min-h-screen bg-anime-darker flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-anime">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-anime-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
            <p className="text-gray-400">Access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter password"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full btn-anime">
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
