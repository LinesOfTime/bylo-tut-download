# Pages publication queue

The Pages publication workflow retains its main/web path filters, manual trigger, permissions, environment and build/deploy actions. Running deployments are not cancelled by newer commits. `queue: max` allows up to 100 pending deployments; GitHub cancels arrivals beyond that bound. FIFO uses queue-entry time, not commit time, so this is not an absolute guarantee for an unbounded release queue.

This setting follows [GitHub concurrency documentation](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency), checked 2026-10-28. actionlint 1.7.12 does not recognize the documented `queue` property; all other lint diagnostics were checked separately. GitHub acceptance and real publication remain pending. No deployment was dispatched for validation.

This public repository uses standard runners; the change protects publication continuity and is not claimed as private-quota savings. No application release asset or existing Pages artifact is deleted.
