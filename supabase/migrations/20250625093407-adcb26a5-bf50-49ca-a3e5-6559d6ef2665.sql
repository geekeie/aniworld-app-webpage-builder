
-- Create table for main site content and configuration
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  content_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Admin',
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  image_alt TEXT,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for app screenshots
CREATE TABLE public.app_screenshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for media files (logos, images)
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_type TEXT NOT NULL, -- 'header_logo', 'hero_background', 'hero_foreground'
  file_url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default site content
INSERT INTO public.site_content (content_key, content_value) VALUES
('main_settings', '{
  "metaTitle": "AniWorld App – Kostenlose Anime Streaming APK für Android",
  "metaDescription": "Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!",
  "heroTitle": "Streame Anime kostenlos mit der AniWorld App",
  "heroSubtitle": "Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.",
  "downloadButtonText": "Jetzt herunterladen",
  "downloadUrl": "",
  "appName": "AniWorld APK",
  "appVersion": "Version 3.2.1",
  "appSize": "25 MB",
  "appRequirements": "Android 5.0+",
  "appRating": 4.8,
  "totalRatings": 12543,
  "customHeaderCode": ""
}'::jsonb);

-- Insert default media file entries
INSERT INTO public.media_files (file_type, file_url, file_name) VALUES
('header_logo', '/logo.png', 'logo.png'),
('hero_background', '/hero-image.png', 'hero-image.png'),
('hero_foreground', '', '');

-- Enable Row Level Security (but allow public access)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to site_content" 
  ON public.site_content FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to blog_posts" 
  ON public.blog_posts FOR SELECT 
  USING (published = true);

CREATE POLICY "Allow public read access to app_screenshots" 
  ON public.app_screenshots FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to media_files" 
  ON public.media_files FOR SELECT 
  USING (true);

-- Create policies for public write access (since this is a demo site)
CREATE POLICY "Allow public insert to site_content" 
  ON public.site_content FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update to site_content" 
  ON public.site_content FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public insert to blog_posts" 
  ON public.blog_posts FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update to blog_posts" 
  ON public.blog_posts FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete to blog_posts" 
  ON public.blog_posts FOR DELETE 
  USING (true);

CREATE POLICY "Allow public insert to app_screenshots" 
  ON public.app_screenshots FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update to app_screenshots" 
  ON public.app_screenshots FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete to app_screenshots" 
  ON public.app_screenshots FOR DELETE 
  USING (true);

CREATE POLICY "Allow public insert to media_files" 
  ON public.media_files FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update to media_files" 
  ON public.media_files FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete to media_files" 
  ON public.media_files FOR DELETE 
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_site_content_key ON public.site_content(content_key);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX idx_app_screenshots_sort_order ON public.app_screenshots(sort_order);
CREATE INDEX idx_media_files_type ON public.media_files(file_type);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE
    ON public.site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE
    ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE
    ON public.media_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
