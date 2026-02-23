import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                'green-nature': '#13EC5B',
                'midnight-blue': '#0F172A',
                'cloud-soft': '#F1F5F9',
                'slate-muted': '#64748B',
                'slate-soft': '#94A3B8',
            }
        }
    }
}