import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                'green-nature': '#13EC5B',
                'green-forest': '#4C9A66',
                'green-whisper': '#E7F3EB',
                'midnight-blue': '#0F172A',
                'cloud-soft': '#F1F5F9',
                'slate-muted': '#64748B',
                'slate-soft': '#94A3B8',
                'slate-deep': '#334155',
                'slate-whisper': '#F8FAFC',
                'slate-light': '#E2E8F0',
                'neutral-linen': '#EEEFEA'
            }
        }
    },
    plugins: [
        function({ addComponents }) {
            addComponents({
                '.input': {
                    '@apply rounded-xl bg-slate-whisper border border-slate-light px-3 py-2 mt-1 placeholder:text-base placeholder:text-slate-soft': {}
                },
                '.label': {
                    '@apply text-slate-deep text-sm font-semibold pl-1.5': {}
                },
                '.submit-btn': {
                    '@apply w-full h-14 bg-green-nature hover:bg-midnight-blue rounded-xl text-midnight-blue hover:text-green-nature text-base font-bold flex items-center justify-center gap-2 transition-all': {}
                },
                '.green-btn': {
                    '@apply bg-green-nature hover:bg-midnight-blue rounded-lg min-w-24 h-10 flex items-center justify-center gap-2 font-semibold text-sm text-midnight-blue hover:text-green-nature transition-colors': {}
                },
                '.light-btn': {
                    '@apply bg-cloud-soft hover:bg-midnight-blue rounded-lg w-24 h-10 flex items-center justify-center gap-2 font-semibold text-sm text-midnight-blue hover:text-cloud-soft transition-colors': {}
                },
                '.h1': {
                    '@apply text-2xl lg:text-3xl leading-9 text-midnight-blue font-extrabold': {}
                }
            })
        }
    ]
}