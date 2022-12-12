declare global {
  type TrackAnalyticsProps = (key: string, traits: Record<string, string | null>) => Promise<void>;

  interface UserAnalyticsProps {
    id: () => string
    anonymousId: () => string
  }

  interface AnalyticsProps {
    user: () => UserAnalyticsProps
    track: TrackAnalyticsProps
  }

  var analytics: AnalyticsProps; // eslint-disable-line
}

export {};
