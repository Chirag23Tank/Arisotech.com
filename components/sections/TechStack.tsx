'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Smartphone, Cloud, Database, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface TechCategory {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  technologies: {
    name: string
    description: string
    proficiency: number
  }[]
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Code,
    technologies: [
      { name: 'React', description: 'Modern UI library', proficiency: 95 },
      { name: 'Next.js', description: 'Full-stack framework', proficiency: 90 },
      { name: 'TypeScript', description: 'Type-safe JavaScript', proficiency: 92 },
      { name: 'Tailwind CSS', description: 'Utility-first CSS', proficiency: 88 },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    technologies: [
      { name: 'React Native', description: 'Cross-platform apps', proficiency: 90 },
      { name: 'Expo', description: 'Development platform', proficiency: 85 },
      { name: 'Flutter', description: 'Google\'s UI toolkit', proficiency: 75 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Database,
    technologies: [
      { name: 'Node.js', description: 'JavaScript runtime', proficiency: 88 },
      { name: 'Python', description: 'Versatile language', proficiency: 85 },
      { name: 'PostgreSQL', description: 'Relational database', proficiency: 90 },
      { name: 'MongoDB', description: 'NoSQL database', proficiency: 82 },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    icon: Cloud,
    technologies: [
      { name: 'AWS', description: 'Amazon Web Services', proficiency: 85 },
      { name: 'Vercel', description: 'Deployment platform', proficiency: 92 },
      { name: 'Supabase', description: 'Backend as a service', proficiency: 90 },
      { name: 'Docker', description: 'Containerization', proficiency: 80 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: Zap,
    technologies: [
      { name: 'Git', description: 'Version control', proficiency: 95 },
      { name: 'CI/CD', description: 'Automation', proficiency: 88 },
      { name: 'Testing', description: 'Quality assurance', proficiency: 85 },
    ],
  },
]

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>(techCategories[0].id)

  return (
    <section className="py-20 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Technology Stack
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore the technologies we use to build exceptional solutions
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techCategories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={isSelected}
                aria-label={`Select ${category.name} category`}
              >
                <Icon className="h-5 w-5" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Technologies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {techCategories
              .find((cat) => cat.id === selectedCategory)
              ?.technologies.map((tech, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <CardDescription>{tech.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Proficiency</span>
                        <span>{tech.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.proficiency}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="bg-blue-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}






