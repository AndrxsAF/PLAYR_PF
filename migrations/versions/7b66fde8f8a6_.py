"""empty message

Revision ID: 7b66fde8f8a6
Revises: ef6e9eaaf37a
Create Date: 2022-02-26 13:43:20.954623

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b66fde8f8a6'
down_revision = 'ef6e9eaaf37a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'user_type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('user_type', sa.VARCHAR(length=30), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
