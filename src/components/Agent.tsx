import { AgentType } from '../api/agent/types';

interface PropType {
  agent: AgentType;
  authToken: string | null;
}

export default function Agent({ agent, authToken }: PropType) {
  return (
    <div className="flex justify-center mt-8">
      <div className="grid grid-cols-2 gap-2 w-max">
        <div>Symbol</div>
        <div>{agent.symbol}</div>
        <div>Faction</div>
        <div>{agent.startingFaction}</div>
        <div>Credits</div>
        <div>{agent.credits.toLocaleString()}</div>
        {authToken && (
          <>
            <div>Token</div>
            <div>{authToken}</div>
          </>
        )}
      </div>
    </div>
  );
}
