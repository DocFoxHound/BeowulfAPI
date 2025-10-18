const sequelize = require('../config/database');

// GET /patch/:patch with date range in path or query
// Accepts:
// - params.patch: string patch identifier (e.g., '4.2')
// - either params.start_ms & params.end_ms as path numbers, or query.start & query.end as ms
// Returns array of rows from BeowulfHunter_Patch_Data(patch, start_ms, end_ms)
exports.getByPatchAndRange = async (req, res) => {
  try {
    const { patch, start_ms: startMsParam, end_ms: endMsParam } = req.params;
    const startQ = req.query.start;
    const endQ = req.query.end;

    const startMs = startMsParam ?? startQ;
    const endMs = endMsParam ?? endQ;

    if (!patch) {
      return res.status(400).json({ error: "Missing required parameter 'patch'" });
    }
    if (startMs === undefined || endMs === undefined) {
      return res.status(400).json({ error: "Missing required time range: provide start and end (milliseconds since epoch) either in path or as query parameters ?start=...&end=..." });
    }

    const startNum = Number(startMs);
    const endNum = Number(endMs);
    if (!Number.isFinite(startNum) || !Number.isFinite(endNum)) {
      return res.status(400).json({ error: 'start and end must be valid numbers (milliseconds since epoch)' });
    }

    const rows = await sequelize.query(
      'SELECT * FROM BeowulfHunter_Patch_Data(:patch, :start, :end)',
      {
        replacements: { patch, start: startNum, end: endNum },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
