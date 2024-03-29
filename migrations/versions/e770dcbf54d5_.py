"""empty message

Revision ID: e770dcbf54d5
Revises: 
Create Date: 2022-03-29 16:51:16.130470

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e770dcbf54d5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('biography', sa.String(length=200), nullable=True),
    sa.Column('img_url', sa.String(length=300), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('follow',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('from_user_id', sa.Integer(), nullable=True),
    sa.Column('to_user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['from_user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['to_user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('img_url', sa.String(length=300), nullable=True),
    sa.Column('description', sa.String(length=280), nullable=True),
    sa.Column('game', sa.String(length=70), nullable=True),
    sa.Column('console', sa.String(length=50), nullable=True),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('tag1', sa.String(length=50), nullable=True),
    sa.Column('tag2', sa.String(length=50), nullable=True),
    sa.Column('tag3', sa.String(length=50), nullable=True),
    sa.Column('tag4', sa.String(length=50), nullable=True),
    sa.Column('tag5', sa.String(length=50), nullable=True),
    sa.Column('isActive', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(length=280), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('like',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('from_user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['from_user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('notification',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('from_user_id', sa.Integer(), nullable=True),
    sa.Column('to_user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['from_user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], ),
    sa.ForeignKeyConstraint(['to_user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('saved',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('saved')
    op.drop_table('notification')
    op.drop_table('like')
    op.drop_table('comment')
    op.drop_table('post')
    op.drop_table('follow')
    op.drop_table('user')
    # ### end Alembic commands ###
