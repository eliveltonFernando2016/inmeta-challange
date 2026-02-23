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
                'slate-deep': '#334155',
                'slate-whisper': '#F8FAFC',
                'slate-light': '#E2E8F0'
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
                }
            })
        }
    ]
}