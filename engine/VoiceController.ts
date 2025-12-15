export class VoiceController {
  private recognition?: SpeechRecognition

  start(onIntent: (intent: string) => void) {
    const Speech =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!Speech) return

    this.recognition = new Speech()
    this.recognition.lang = "en-US"
    this.recognition.onresult = e =>
      onIntent(e.results[0][0].transcript.toLowerCase())
    this.recognition.start()
  }
}