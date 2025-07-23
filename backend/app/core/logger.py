import logging
from logging.handlers import RotatingFileHandler
import sys

LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
LOG_FILE = "app.log"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT, stream=sys.stdout)
logger = logging.getLogger("app")

# Optional: File logging with rotation
handler = RotatingFileHandler(LOG_FILE, maxBytes=10_000_000, backupCount=5)
handler.setFormatter(logging.Formatter(LOG_FORMAT))
logger.addHandler(handler)
