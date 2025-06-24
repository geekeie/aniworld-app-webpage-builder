
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContactUs = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.title = language === 'de' ? 'Kontakt - AniWorld App' : 'Contact Us - AniWorld App';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'de' 
        ? 'Kontaktieren Sie das AniWorld App Team. Wir helfen Ihnen gerne bei Fragen und Anregungen.'
        : 'Contact the AniWorld App team. We are happy to help you with questions and suggestions.'
      );
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: language === 'de' ? 'Fehler' : 'Error',
        description: language === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus.' : 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // Simulate form submission
    toast({
      title: language === 'de' ? 'Nachricht gesendet' : 'Message Sent',
      description: language === 'de' ? 'Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.' : 'Thank you for your message. We will get back to you soon.'
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-anime-darker">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              {language === 'de' ? 'Kontakt' : 'Contact Us'}
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {language === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {language === 'de' 
                      ? 'Haben Sie Fragen oder Anregungen? Wir freuen uns auf Ihre Nachricht!'
                      : 'Have questions or suggestions? We look forward to hearing from you!'
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-anime-purple" />
                    <span className="text-gray-300">support@aniworldapp.de</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-anime-pink" />
                    <span className="text-gray-300">
                      {language === 'de' ? 'Live-Chat verfügbar' : 'Live chat available'}
                    </span>
                  </div>
                </div>

                <div className="bg-anime-dark p-6 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-3">
                    {language === 'de' ? 'Häufige Anfragen' : 'Common Inquiries'}
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• {language === 'de' ? 'Technischer Support' : 'Technical Support'}</li>
                    <li>• {language === 'de' ? 'Feature-Anfragen' : 'Feature Requests'}</li>
                    <li>• {language === 'de' ? 'Bug-Reports' : 'Bug Reports'}</li>
                    <li>• {language === 'de' ? 'Allgemeine Fragen' : 'General Questions'}</li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-anime-dark p-8 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {language === 'de' ? 'Nachricht senden' : 'Send Message'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      {language === 'de' ? 'Name' : 'Name'} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-600 text-white mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      {language === 'de' ? 'E-Mail' : 'Email'} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-600 text-white mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-300">
                      {language === 'de' ? 'Betreff' : 'Subject'}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-600 text-white mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300">
                      {language === 'de' ? 'Nachricht' : 'Message'} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-gray-800 border-gray-600 text-white mt-1"
                      required
                    />
                  </div>

                  <Button type="submit" className="btn-anime w-full">
                    <Send className="mr-2 h-4 w-4" />
                    {language === 'de' ? 'Nachricht senden' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
