import type { Metadata } from 'next';
import { Download, Shield, Zap, Heart } from 'lucide-react';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Insta Glan, our mission to provide the best free Instagram downloader, and the values that drive us.',
};

const values = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Speed First',
    description: 'We optimize every millisecond to deliver the fastest download experience possible.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Privacy Focused',
    description: 'We never store your data or downloaded content. Your privacy is non-negotiable.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Quality Matters',
    description: 'We deliver the highest available quality — no compression, no watermarks, no compromises.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Community Driven',
    description: 'Built for the community, by the community. Always free, always improving.',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            About <span className="gradient-text">Insta Glan</span>
          </h1>
          <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto leading-relaxed">
            Insta Glan is a modern, fast, and secure Instagram content downloader built to help users save their favorite public Instagram content with ease.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card hover={false} className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-4">
              We believe that publicly shared content should be easily accessible to everyone. Our mission is to provide the most reliable, fastest, and most user-friendly Instagram downloader on the web — completely free of charge.
            </p>
            <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
              While Instagram is an incredible platform for sharing moments, it doesn&apos;t always make it easy to save content for offline viewing. Insta Glan bridges that gap by offering a seamless download experience across all device types.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-10">
            Our <span className="gradient-text">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title} hover={true} className="p-7">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white mb-5 shadow-glow-sm`}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 font-display">{value.title}</h3>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Downloads', value: '1M+' },
            { label: 'Happy Users', value: '500K+' },
            { label: 'Formats', value: '6+' },
            { label: 'Uptime', value: '99.9%' },
          ].map((stat) => (
            <Card key={stat.label} hover={false} className="p-6 text-center">
              <p className="text-3xl font-bold font-display gradient-text mb-1">{stat.value}</p>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <Card hover={false} className="p-6 text-center">
          <p className="text-sm text-text-light-tertiary dark:text-text-dark-tertiary leading-relaxed">
            <strong>Disclaimer:</strong> Insta Glan supports only publicly accessible Instagram content. We are not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc. Users are responsible for respecting copyright and Instagram&apos;s terms of service.
          </p>
        </Card>
      </div>
    </div>
  );
}
