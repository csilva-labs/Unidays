import { useFlags } from '../../context/FlagContext'

export default function AnnouncementBar() {
  const { flags } = useFlags()

  if (!flags.aiPersonalisedAnnouncement) return null

  return (
    <div className="bg-ud-teal text-ud-navy text-sm font-inter font-semibold px-4 py-2 text-center animate-fade-in">
      ✨ AI-powered: Back-to-school deals personalised for you — 847 students claimed today
    </div>
  )
}
