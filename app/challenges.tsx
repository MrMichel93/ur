import { ProtectedRoute } from '@/src/screens/ProtectedRoute';
import ChallengesScreen from '@/src/screens/ChallengesScreen';

export default function ChallengesRoute() {
  return (
    <ProtectedRoute>
      <ChallengesScreen />
    </ProtectedRoute>
  );
}
