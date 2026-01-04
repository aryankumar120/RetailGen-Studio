import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Sparkles, Layout, Zap, Shield, Download, Palette, Wand2, CheckCircle, Rocket, TrendingUp, Award, Target, ArrowRight, Play, Upload, Image as ImageIcon, MousePointer2, FileDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/UI/Button'
import CircularGallery from '@/components/CircularGallery'

export default function HomePage() {
  const navigate = useNavigate()

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const features = [
    {
      icon: Layout,
      title: 'Visual Canvas Editor',
      description: 'Intuitive drag-and-drop interface powered by Fabric.js for seamless creative composition',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Tools',
      description: 'Background removal, intelligent layout suggestions, and smart creative recommendations',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Compliance Validation',
      description: 'Automated checking against retailer guidelines and brand identity constraints',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Download,
      title: 'Multi-Format Export',
      description: 'One-click export for Facebook, Instagram, and in-store displays with auto-optimization',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Palette,
      title: 'Brand Kit Manager',
      description: 'Store and apply your brand colors, palettes, and design elements consistently',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'Smart Optimization',
      description: 'Auto-compress images to <500KB without quality loss using AI algorithms',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ]

  const stats = [
    { value: '99%', label: 'Faster Production', icon: TrendingUp },
    { value: '500KB', label: 'Optimized Files', icon: Zap },
    { value: '5+', label: 'Export Formats', icon: Layout },
    { value: '100%', label: 'AI-Powered', icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                RetailGen Studio
              </span>
              <div className="text-xs text-gray-400 font-medium">AI Creative Builder</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToDemo}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Try Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-12">
        {/* Glassmorphic Hero Card */}
        <div className="relative max-w-7xl mx-auto">
          {/* Glow effect behind card */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>

          {/* Main glassmorphic card */}
          <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side - Text content */}
              <div className="flex-1 space-y-8">
                

                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI-Powered
                  </span>
                  <br />
                  <span className="text-white">Creative Builder</span>
                  <br />
                  <span className="text-gray-400 text-3xl lg:text-4xl">for Retail Media</span>
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  Transform your retail creative workflow with AI-driven tools.
                  <br />
                  <span className="text-purple-400 font-semibold">No design expertise required.</span> Perfect for brands of all sizes.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/editor')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Start Creating Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <button
                    onClick={scrollToFeatures}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      View Features
                    </span>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-8 pt-8">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Visual element */}
              <div className="flex-1 relative">
                <div className="relative w-full aspect-square">
                  {/* Floating cards with glassmorphism */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Center glow */}
                    <div className="absolute w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30"></div>

                    {/* Floating card 1 */}
                    <div className="absolute top-0 left-0 w-64 h-40 backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                      <div className="p-6 h-full flex flex-col justify-between">
                        <Layout className="w-8 h-8 text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-400">Canvas Editor</div>
                          <div className="text-2xl font-bold">Drag & Drop</div>
                        </div>
                      </div>
                    </div>

                    {/* Floating card 2 */}
                    <div className="absolute bottom-0 right-0 w-64 h-40 backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                      <div className="p-6 h-full flex flex-col justify-between">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">AI-Powered</div>
                          <div className="text-2xl font-bold">Smart Tools</div>
                        </div>
                      </div>
                    </div>

                    {/* Center card */}
                    <div className="relative w-72 h-48 backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-white/20 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500">
                      <div className="p-6 h-full flex flex-col justify-between">
                        <Zap className="w-10 h-10 text-pink-400" />
                        <div>
                          <div className="text-sm text-gray-400">Optimize & Export</div>
                          <div className="text-3xl font-bold">Multi-Format</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section id="features-section" className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create professional retail creatives in one platform
          </p>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-testimonials {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll-testimonials {
            animation: scroll-testimonials 40s linear infinite;
          }
          .animate-scroll-testimonials:hover {
            animation-play-state: paused;
          }
          @keyframes scroll-testimonials-reverse {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          .animate-scroll-testimonials-reverse {
            animation: scroll-testimonials-reverse 40s linear infinite;
          }
          .animate-scroll-testimonials-reverse:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Features Grid */}
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {features.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl h-[280px]"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s ease-out'
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
              }}
            >
              {/* Gradient glow on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity blur-2xl -z-10`}></div>

              <div className="relative h-full flex flex-col">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 transition-all shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Showcase Gallery */}
      <section className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white">
            Creative Showcase
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional retail creatives crafted with RetailGen Studio
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop',
              title: 'Product Launch',
              platform: 'Instagram'
            },
            {
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop',
              title: 'Summer Sale',
              platform: 'Facebook'
            },
            {
              image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop',
              title: 'New Collection',
              platform: 'In-Store'
            },
            {
              image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=800&fit=crop',
              title: 'Flash Deal',
              platform: 'Instagram'
            },
            {
              image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=800&fit=crop',
              title: 'Brand Campaign',
              platform: 'Facebook'
            },
            {
              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
              title: 'Product Feature',
              platform: 'In-Store'
            },
            {
              image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop',
              title: 'Limited Edition',
              platform: 'Instagram'
            },
            {
              image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=800&fit=crop',
              title: 'Holiday Special',
              platform: 'Facebook'
            }
          ].map((creative, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
            >
              {/* Gradient glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur-2xl -z-10"></div>

              {/* Image */}
              <img
                src={creative.image}
                alt={creative.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg mb-1">{creative.title}</h3>
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  {creative.platform}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white">
            Don't just take our word for it
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're proud to support creators and businesses worldwide. Here's what some of them had to say.
          </p>
        </div>

        {/* First Row - Scrolling Left to Right */}
        <div className="relative w-full overflow-hidden mb-6">
          <div className="flex gap-6 animate-scroll-testimonials">
            {[
              {
                name: 'Sarah Chen',
                role: 'Marketing Director',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                text: 'RetailGen Studio transformed our creative workflow. What used to take days now takes hours. The AI tools are incredibly accurate and save us so much time.'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Brand Manager',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
                text: 'The compliance validation feature is a game-changer. We can now ensure all our creatives meet retailer guidelines before submission. No more rejections!'
              },
              {
                name: 'Emily Thompson',
                role: 'E-commerce Lead',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
                text: 'I love how easy it is to maintain brand consistency across all platforms. The Brand Kit feature keeps everything organized and accessible.'
              },
              {
                name: 'David Park',
                role: 'Creative Director',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
                text: 'The multi-format export is brilliant. One design, optimized for Facebook, Instagram, and in-store displays instantly. This tool is worth every penny.'
              },
              {
                name: 'Jessica Williams',
                role: 'Product Designer',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
                text: 'Background removal has never been this accurate. The AI understands complex edges perfectly. My productivity has increased by 80%.'
              },
              {
                name: 'Alex Kumar',
                role: 'Marketing Manager',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                text: 'RetailGen Studio is incredibly intuitive. Even our junior team members can create professional-quality creatives without extensive training.'
              }
            ].concat([
              {
                name: 'Sarah Chen',
                role: 'Marketing Director',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                text: 'RetailGen Studio transformed our creative workflow. What used to take days now takes hours. The AI tools are incredibly accurate and save us so much time.'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Brand Manager',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
                text: 'The compliance validation feature is a game-changer. We can now ensure all our creatives meet retailer guidelines before submission. No more rejections!'
              },
              {
                name: 'Emily Thompson',
                role: 'E-commerce Lead',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
                text: 'I love how easy it is to maintain brand consistency across all platforms. The Brand Kit feature keeps everything organized and accessible.'
              },
              {
                name: 'David Park',
                role: 'Creative Director',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
                text: 'The multi-format export is brilliant. One design, optimized for Facebook, Instagram, and in-store displays instantly. This tool is worth every penny.'
              },
              {
                name: 'Jessica Williams',
                role: 'Product Designer',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
                text: 'Background removal has never been this accurate. The AI understands complex edges perfectly. My productivity has increased by 80%.'
              },
              {
                name: 'Alex Kumar',
                role: 'Marketing Manager',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
                text: 'RetailGen Studio is incredibly intuitive. Even our junior team members can create professional-quality creatives without extensive training.'
              }
            ]).map((testimonial, index) => (
              <div
                key={`row1-${testimonial.name}-${index}`}
                className="min-w-[380px] max-w-[380px] h-[300px] flex-shrink-0 group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur-2xl -z-10"></div>

                <div className="relative h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all"
                    />
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Scrolling Right to Left */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-scroll-testimonials-reverse">
            {[
              {
                name: 'Lisa Anderson',
                role: 'Social Media Manager',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
                text: 'The smart optimization feature is incredible. Files are automatically compressed to under 500KB without any visible quality loss. A must-have tool!'
              },
              {
                name: 'James Wilson',
                role: 'Digital Marketing Lead',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
                text: 'We reduced our creative production time by 90%. The AI suggestions are spot-on and help us create compelling visuals that convert better.'
              },
              {
                name: 'Priya Sharma',
                role: 'Brand Strategist',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
                text: 'Finally, a tool that understands retail media requirements. The compliance checker has saved us countless hours of back-and-forth with platforms.'
              },
              {
                name: 'Tom Martinez',
                role: 'E-commerce Director',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
                text: 'The drag-and-drop editor is so intuitive. Our entire team was up and running within minutes. No steep learning curve at all!'
              },
              {
                name: 'Rachel Kim',
                role: 'Content Creator',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
                text: 'I can maintain perfect brand consistency across all our retail channels. The Brand Kit feature is a lifesaver for managing multiple brands.'
              },
              {
                name: 'Daniel Brown',
                role: 'Growth Hacker',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
                text: 'Best investment we made this year. ROI was positive within the first month. Our creative output has tripled while quality improved.'
              }
            ].concat([
              {
                name: 'Lisa Anderson',
                role: 'Social Media Manager',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
                text: 'The smart optimization feature is incredible. Files are automatically compressed to under 500KB without any visible quality loss. A must-have tool!'
              },
              {
                name: 'James Wilson',
                role: 'Digital Marketing Lead',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
                text: 'We reduced our creative production time by 90%. The AI suggestions are spot-on and help us create compelling visuals that convert better.'
              },
              {
                name: 'Priya Sharma',
                role: 'Brand Strategist',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
                text: 'Finally, a tool that understands retail media requirements. The compliance checker has saved us countless hours of back-and-forth with platforms.'
              },
              {
                name: 'Tom Martinez',
                role: 'E-commerce Director',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
                text: 'The drag-and-drop editor is so intuitive. Our entire team was up and running within minutes. No steep learning curve at all!'
              },
              {
                name: 'Rachel Kim',
                role: 'Content Creator',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
                text: 'I can maintain perfect brand consistency across all our retail channels. The Brand Kit feature is a lifesaver for managing multiple brands.'
              },
              {
                name: 'Daniel Brown',
                role: 'Growth Hacker',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
                text: 'Best investment we made this year. ROI was positive within the first month. Our creative output has tripled while quality improved.'
              }
            ]).map((testimonial, index) => (
              <div
                key={`row2-${testimonial.name}-${index}`}
                className="min-w-[380px] max-w-[380px] h-[300px] flex-shrink-0 group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur-2xl -z-10"></div>

                <div className="relative h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all"
                    />
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo/Workflow Section */}
      <section id="demo-section" className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            See How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create professional retail creatives in 4 simple steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="group relative">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-blue-600/30 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur-2xl -z-10"></div>

                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/50">
                  1
                </div>

                {/* Animated icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center transition-transform duration-500">
                  <Upload className="w-10 h-10 text-blue-400 animate-bounce" style={{ animationDuration: '2s' }} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white text-center">Upload Image</h3>
                <p className="text-gray-400 text-sm text-center">
                  Drop your product photo or choose from library
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl" style={{ animationDelay: '200ms' }}>
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/30 to-purple-600/30 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur-2xl -z-10"></div>

                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/50">
                  2
                </div>

                {/* Animated icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center transition-transform duration-500">
                  <Wand2 className="w-10 h-10 text-purple-400" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white text-center">AI Magic</h3>
                <p className="text-gray-400 text-sm text-center">
                  Remove background & get smart layout suggestions
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl" style={{ animationDelay: '400ms' }}>
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/30 to-pink-600/30 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur-2xl -z-10"></div>

                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-pink-500/50">
                  3
                </div>

                {/* Animated icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center transition-transform duration-500">
                  <MousePointer2 className="w-10 h-10 text-pink-400 group-hover:rotate-12 transition-transform" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white text-center">Customize</h3>
                <p className="text-gray-400 text-sm text-center">
                  Add text, colors, and apply your brand kit
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl" style={{ animationDelay: '600ms' }}>
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500/30 to-green-600/30 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity blur-2xl -z-10"></div>
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-green-500/50">
                  4
                </div>

                {/* Animated icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center transition-transform duration-500">
                  <FileDown className="w-10 h-10 text-green-400 group-hover:translate-y-2 transition-transform" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white text-center">Export</h3>
                <p className="text-gray-400 text-sm text-center">
                  Download in all formats, optimized & ready
                </p>
              </div>
            </div>
          </div>

          {/* CTA Below Workflow */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6 text-lg">Ready to create your first design?</p>
            <button
              onClick={() => navigate('/editor')}
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400 backdrop-blur-xl bg-slate-900/50">
        <p>&copy; 2024 RetailGen Studio. Built for Retail Media Creative Tool Hackathon.</p>
      </footer>
    </div>
  )
}
